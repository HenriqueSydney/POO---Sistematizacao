package br.com.henriquelima.dianome.utils;

import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;

public class ResponseFormatter {
    private Map<String, Object> data = new HashMap<>();

    
    public ResponseFormatter(String message) {
        this.data.put("message", message);
    }

    public ResponseFormatter(String message, String resourceName, Object additionalResource) {
        this.data.put("message", message);
        this.data.put(resourceName, additionalResource);
    }

    public String toJson() {
        Gson gson = new Gson();
        return gson.toJson(this.data);
    }

   /* public static void main(String[] args) {
        ResponseFormatter response = new ResponseFormatter("Mensagem", "AA", "Atributos");
        String jsonResponse = response.toJson();
        System.out.println(jsonResponse);
    }*/

}
