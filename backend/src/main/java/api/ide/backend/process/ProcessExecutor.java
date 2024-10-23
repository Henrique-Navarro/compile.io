package api.ide.backend.process;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class ProcessExecutor {

    public ProcessOutput executeProcess(Process process) throws Exception {
        return readProcessOutput(process);
    }

    private ProcessOutput readProcessOutput(Process process) throws Exception {
        StringBuilder output = new StringBuilder();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;

            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
        }

        int exitCode = process.waitFor();
        String processOutput = output.toString().replace("usr/src/app", "");

        return new ProcessOutput(exitCode, processOutput);
    }

    private ProcessOutput readErrorOutput(Process process) throws Exception {
        StringBuilder errorOutput = new StringBuilder();

        try (BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()))) {
            String errorLine;

            while ((errorLine = errorReader.readLine()) != null) {
                errorOutput.append(errorLine).append("\n");
            }
        }

        int exitCode = process.waitFor();

        System.out.println(errorOutput.toString());
        return new ProcessOutput(exitCode, errorOutput.toString());
    }
}