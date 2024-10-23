package api.ide.backend.process;

public class ProcessOutput {
    int exitCode;
    String output;

    public ProcessOutput(int exitCode, String output) {
        this.exitCode = exitCode;
        this.output = output;
    }

    public int getExitCode() {
        return exitCode;
    }

    public String getOutput() {
        return output;
    }
}