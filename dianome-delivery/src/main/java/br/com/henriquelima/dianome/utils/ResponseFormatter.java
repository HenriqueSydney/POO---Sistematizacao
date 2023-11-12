package br.com.henriquelima.dianome.utils;

import java.util.HashMap;
import java.util.Map;

import com.google.gson.Gson;

public class ResponseFormatter {
    private Map<String, Object> data = new HashMap<>();

    
    public ResponseFormatter(String message) {
        this.data.put("message", message);
    }

    public ResponseFormatter(String message, String resourceName,  Object... resources) throws IllegalArgumentException {
        this.data.put("message", message);

        if (resources.length % 2 != 0) {
            throw new IllegalArgumentException("Os recursos devem ser passados como pares (nome, objeto).");
        }
        
        for (int i = 0; i < resources.length; i += 2)   {
            if (!(resources[i] instanceof String)) {
                throw new IllegalArgumentException("Os nomes dos recursos devem ser do tipo String.");
            }
            this.data.put((String) resources[i], resources[i + 1]);
        }
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
