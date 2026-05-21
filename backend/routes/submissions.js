const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Problem, Submission, TestCase } = require('../models');
const { authenticateToken } = require('../middleware/auth');

const LANGUAGE_MAP = {
    'python': 71,
    'cpp': 54,
    'java': 62
};

// Submit solution
router.post('/submit', authenticateToken, async (req, res) => {
    try {
        const { problem_id, code, language } = req.body;
        const user_id = req.user.id;
        const delay = (ms) => new Promise(res => setTimeout(res, ms));

        // Log helper
        const log = (msg) => {
            if (req.io) req.io.to(`user_${user_id}`).emit('execution_log', { message: msg, time: new Date().toLocaleTimeString() });
        };

        // Emit that execution has started
        log('🚀 Initializing Build Environment...');
        await delay(500);

        // Fetch problem details for sample testing
        const problem = await Problem.findByPk(problem_id, {
            attributes: ['title', 'sample_input', 'sample_output']
        });
        
        if (!problem) return res.status(404).json({ message: "Problem not found" });

        const language_id = LANGUAGE_MAP[language] || 71;
        log(`🔍 Loading problem context: ${problem.title}`);
        await delay(300);

        let resultOutput, resultStatus, resultStdout, resultStderr;
        let rawTestResults = [];

        const testCases = await TestCase.findAll({ where: { problem_id } });
        // Fallback if no testcases exist in DB
        const casesToRun = testCases.length > 0 ? testCases : [{
            input: problem.sample_input || "",
            expected_output: problem.sample_output || "",
            is_hidden: false
        }];

        if (!process.env.JUDGE0_API_KEY) {
            const fs = require('fs');
            const path = require('path');
            const os = require('os');
            const { execSync } = require('child_process');
            
            const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'codepulse-exec-'));
            log(`📁 Created Sandbox: ${path.basename(tmpDir)}`);
            await delay(300);
            
            let execStatus = 0;
            let finalResultStatus = 'Accepted';
            
            try {
                // Compilation Phase
                let exePath = '';
                let pythonPath = '';
                let javaClass = '';
                
                if (language === 'java') {
                    log('💾 Writing Java source file...');
                    const match = code.match(/class\s+([A-Za-z0-9_]+)/);
                    javaClass = match ? match[1] : 'Main';
                    const file = path.join(tmpDir, `${javaClass}.java`);
                    fs.writeFileSync(file, code);
                    log('⚙️ Compiling Java Binary...');
                    await delay(500);
                    execSync(`javac "${file}"`, { timeout: 8000, encoding: 'utf-8' });
                } else if (language === 'python') {
                    log('💾 Writing Python script...');
                    const file = path.join(tmpDir, 'script.py');
                    const pythonCode = `import json\nnull = None\ntrue = True\nfalse = False\n\n` + code;
                    fs.writeFileSync(file, pythonCode);
                    pythonPath = fs.existsSync('C:\\Users\\hp\\AppData\\Local\\Programs\\Python\\Python311\\python.exe') ? 
                        '"C:\\Users\\hp\\AppData\\Local\\Programs\\Python\\Python311\\python.exe"' : 'python';
                } else if (language === 'cpp') {
                    log('💾 Writing C++ script...');
                    const file = path.join(tmpDir, 'main.cpp');
                    exePath = path.join(tmpDir, 'a.exe');
                    fs.writeFileSync(file, code);
                    const cppBin = fs.existsSync('C:\\Users\\hp\\AppData\\Local\\Microsoft\\WinGet\\Packages\\BrechtSanders.WinLibs.POSIX.UCRT_Microsoft.Winget.Source_8wekyb3d8bbwe\\mingw64\\bin\\g++.exe') ? 
                        '"C:\\Users\\hp\\AppData\\Local\\Microsoft\\WinGet\\Packages\\BrechtSanders.WinLibs.POSIX.UCRT_Microsoft.Winget.Source_8wekyb3d8bbwe\\mingw64\\bin\\g++.exe"' : 'g++';
                    log('⚙️ Linking Native Binary with g++...');
                    await delay(500);
                    execSync(`${cppBin} "${file}" -o "${exePath}"`, { timeout: 10000, encoding: 'utf-8' });
                }

                // Execution Phase
                log(`🏃 Running ${casesToRun.length} testcase(s)...`);
                for (let i = 0; i < casesToRun.length; i++) {
                    const tc = casesToRun[i];
                    let tcStdout = "";
                    let tcStderr = "";
                    try {
                        let cmd = '';
                        if (language === 'java') {
                            cmd = `java -cp "${tmpDir}" ${javaClass}`;
                        } else if (language === 'python') {
                            cmd = `${pythonPath} "${path.join(tmpDir, 'script.py')}"`;
                        } else if (language === 'cpp') {
                            cmd = `"${exePath}"`;
                        }
                        tcStdout = execSync(cmd, { input: tc.input, timeout: 5000, encoding: 'utf-8' });
                    } catch (e) {
                        tcStderr = e.stderr ? e.stderr.toString() : e.message;
                        execStatus = e.status || 1;
                    }
                    
                    const normalizeOutput = (str) => {
                        let s = str.replace(/\s+/g, "");
                        if (language === 'python') {
                            s = s.replace(/None/g, "null");
                            s = s.replace(/True/g, "true");
                            s = s.replace(/False/g, "false");
                            s = s.replace(/'/g, '"');
                        }
                        return s;
                    };
                    const actual = tcStdout.trim();
                    const expected = (tc.expected_output || "").trim();
                    const passed = (execStatus === 0) && (normalizeOutput(actual) === normalizeOutput(expected));
                    
                    rawTestResults.push({
                        id: i + 1,
                        is_hidden: tc.is_hidden,
                        passed: passed,
                        status: execStatus !== 0 ? 'Compilation/Runtime Error' : (passed ? 'Accepted' : 'Wrong Answer'),
                        input: tc.input,
                        expected_output: tc.expected_output,
                        actual_output: tcStdout,
                        error: tcStderr
                    });

                    if (execStatus !== 0) {
                        resultStderr = tcStderr;
                        resultOutput = tcStderr;
                        finalResultStatus = 'Compilation/Runtime Error';
                    } else if (!passed) {
                        if (tc.is_hidden) {
                            finalResultStatus = 'Hidden Test Case Failed';
                        } else {
                            finalResultStatus = `Wrong Answer on Testcase ${i + 1}`;
                        }
                        resultStdout = tcStdout;
                        resultOutput = tcStdout;
                    }
                    
                    if (execStatus !== 0 || !passed) {
                        // Mark remaining cases as Skipped
                        for (let j = i + 1; j < casesToRun.length; j++) {
                            const skippedTc = casesToRun[j];
                            rawTestResults.push({
                                id: j + 1,
                                is_hidden: skippedTc.is_hidden,
                                passed: false,
                                status: 'Skipped',
                                input: skippedTc.input,
                                expected_output: skippedTc.expected_output,
                                actual_output: '',
                                error: ''
                            });
                        }
                        break;
                    }
                    
                    if (i === casesToRun.length - 1) {
                        resultStdout = tcStdout;
                        resultOutput = tcStdout;
                    }
                }
                
                resultStatus = finalResultStatus;
                if (resultStatus === 'Accepted') {
                    log('✅ All testcases passed successfully!');
                }

            } catch (e) {
                log('❌ Runtime exception detected.');
                resultStderr = e.stderr ? e.stderr.toString() : e.message;
                resultOutput = resultStderr;
                resultStatus = 'Compilation/Runtime Error';
            } finally {
                try {
                    fs.rmSync(tmpDir, { recursive: true, force: true });
                    log(`🧹 Sandbox ${path.basename(tmpDir)} cleaned up.`);
                } catch (err) {
                    console.error('Failed to cleanup tmpDir:', err);
                }
            }
        } else {
            // Judge0 Path with multiple testcases
            log('⚡ Forwarding to Judge0 Remote Worker...');
            let finalResultStatus = 'Accepted';
            
            for (let i = 0; i < casesToRun.length; i++) {
                const tc = casesToRun[i];
                const options = {
                    method: 'POST',
                    url: `${process.env.JUDGE0_API_URL}/submissions`,
                    params: { base64_encoded: 'true', wait: 'true' },
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key': process.env.JUDGE0_API_KEY,
                        'X-RapidAPI-Host': new URL(process.env.JUDGE0_API_URL).hostname
                    },
                    data: {
                        language_id: language_id,
                        source_code: Buffer.from(code).toString('base64'),
                        stdin: Buffer.from(tc.input || "").toString('base64'),
                        expected_output: Buffer.from(tc.expected_output || "").toString('base64')
                    }
                };

                const response = await axios.request(options);
                const { stdout, stderr, status, compile_output } = response.data;
                
                const currentStatus = status.description;
                const passed = currentStatus === 'Accepted';
                
                const decStdout = stdout ? Buffer.from(stdout, 'base64').toString() : "";
                const decStderr = stderr ? Buffer.from(stderr, 'base64').toString() : "";
                const decCompile = compile_output ? Buffer.from(compile_output, 'base64').toString() : "";
                
                rawTestResults.push({
                    id: i + 1,
                    is_hidden: tc.is_hidden,
                    passed: passed,
                    status: currentStatus,
                    input: tc.input,
                    expected_output: tc.expected_output,
                    actual_output: decStdout,
                    error: decStderr || decCompile
                });

                if (!passed) {
                    if (tc.is_hidden) {
                        finalResultStatus = 'Hidden Test Case Failed';
                    } else {
                        finalResultStatus = currentStatus;
                    }
                    resultStdout = decStdout || null;
                    resultStderr = decStderr || null;
                    resultOutput = decStdout ? decStdout : (decStderr ? decStderr : decCompile);
                    
                    for (let j = i + 1; j < casesToRun.length; j++) {
                        const skippedTc = casesToRun[j];
                        rawTestResults.push({
                            id: j + 1,
                            is_hidden: skippedTc.is_hidden,
                            passed: false,
                            status: 'Skipped',
                            input: skippedTc.input,
                            expected_output: skippedTc.expected_output,
                            actual_output: '',
                            error: ''
                        });
                    }
                    break;
                }
                
                if (i === casesToRun.length - 1) {
                    resultStdout = decStdout || null;
                    resultStderr = null;
                    resultOutput = resultStdout;
                }
            }
            log('✅ Response received from Judge0.');
            resultStatus = finalResultStatus;
        }

        // Save submission 
        const submission = await Submission.create({
            user_id,
            problem_id,
            code,
            language,
            output: resultOutput,
            status: resultStatus,
            test_results: JSON.stringify(rawTestResults)
        });

        // Emit final status
        log(`🎌 Verdict: ${resultStatus}`);
        if (req.io) {
            if (resultStatus === 'Accepted') {
                // Broadcast to everyone!
                req.io.emit('global_solve', { 
                    user_name: req.user.name, 
                    problem_title: problem.title,
                    time: new Date().toLocaleTimeString() 
                });
            }

            req.io.to(`user_${user_id}`).emit('execution_complete', { 
                status: resultStatus, 
                problem_id,
                output: resultOutput,
                stdout: resultStdout,
                stderr: resultStderr
            });
        }

        res.json({
            output: resultOutput,
            status: resultStatus,
            stdout: resultStdout,
            stderr: resultStderr,
            testResults: rawTestResults
        });

    } catch (error) {
        console.error(error);
        if (req.io && req.user) {
            req.io.to(`user_${req.user.id}`).emit('execution_log', { message: '⛔ Server Fault Connection Terminated.', time: new Date().toLocaleTimeString() });
            req.io.to(`user_${req.user.id}`).emit('execution_complete', { status: 'Server Error' });
        }
        res.status(500).json({ error: error.message });
    }
});

// Get user submissions
router.get('/', authenticateToken, async (req, res) => {
    try {
        const submissions = await Submission.findAll({
            where: { user_id: req.user.id },
            include: [{
                model: Problem,
                as: 'problem',
                attributes: ['title']
            }],
            order: [['created_at', 'DESC']]
        });

        // Flatten the response for frontend compatibility
        const flattened = submissions.map(sub => ({
            ...sub.toJSON(),
            problem_title: sub.problem ? sub.problem.title : 'Unknown Problem'
        }));

        res.json(flattened);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
