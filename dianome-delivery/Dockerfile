# Use uma imagem base com suporte ao Java e Maven (por exemplo, OpenJDK)
FROM openjdk:17-jdk

# Configuração do diretório de trabalho
WORKDIR /usr/app

# Copiar os arquivos do aplicativo Spring Boot (assumindo que o JAR é construído localmente)
COPY target/dianome-0.0.1-SNAPSHOT.jar app.jar

# Expor a porta usada pelo aplicativo Spring Boot (ajuste conforme necessário)
EXPOSE 8080

# Comando para executar o aplicativo Spring Boot
CMD ["java", "-jar", "app.jar"]
