package api.ide.backend.compiler;

public class ProcessOutputDTO {
    int exitCode;
    String output;

    public ProcessOutputDTO(int exitCode, String output) {
        this.exitCode = exitCode;
        this.output = output;
    }

    public int getExitCode() {
        return exitCode;
    }

    public String getOutput() {
        return output;
    }

    @Override
    public String toString() {
        return "ProcessOutputDTO{" +
                "exitCode=" + exitCode +
                ", output='" + output + '\'' +
                '}';
    }
}