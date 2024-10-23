package api.ide.backend.enums;

public enum Extension {
    PHP("php"),
    JAVA("java"),
    PYTHON("py"),
    C("c");

    private final String extension;

    Extension(String extension) {
        this.extension = extension;
    }

    public String get() {
        return extension;
    }
}
