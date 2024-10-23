package api.ide.backend.enums;

public enum Image {
    // Referente aos nomes das imagens criadas em `dockerfiles`
    PHP("compilador_php"),
    JAVA("compilador_java"),
    PYTHON("compilador_python"),
    C("compilador_c");

    private final String dockerImage;

    Image(String dockerImage) {
        this.dockerImage = dockerImage;
    }

    public String get() {
        return dockerImage;
    }
}
