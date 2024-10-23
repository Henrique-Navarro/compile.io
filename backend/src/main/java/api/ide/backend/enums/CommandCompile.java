package api.ide.backend.enums;

public enum CommandCompile {
    PHP("php"),
    JAVA("javac"),
    PYTHON("python"),
    C("gcc main.c -o");

    private final String command;

    CommandCompile(String command) {
        this.command = command;
    }

    public String get() {
        return command;
    }
}
