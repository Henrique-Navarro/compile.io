FROM eclipse-temurin:22-jdk
WORKDIR /app
COPY . .
RUN ./mvnw package -DskipTests
CMD ["java", "-jar", "target/*.jar"]
