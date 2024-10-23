FROM openjdk:11

WORKDIR /usr/src/app

COPY . .

CMD ["javac", "Main.java"]
