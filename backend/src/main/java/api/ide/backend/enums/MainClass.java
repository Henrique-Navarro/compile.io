package api.ide.backend.enums;

public enum MainClass {
    MAIN("Main"),
    PHP(MainClass.MAIN.get() + "." + Extension.PHP.get()),
    JAVA(MainClass.MAIN.get() + "." + Extension.JAVA.get()),
    PYTHON(MainClass.MAIN.get() + "." + Extension.PYTHON.get()),
    C(MainClass.MAIN.get() + "." + Extension.C.get());

    private final String name;

    MainClass(String name) {
        this.name = name;
    }

    public String get() {
        return name;
    }
}
