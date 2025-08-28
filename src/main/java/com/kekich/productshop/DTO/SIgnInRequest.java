package com.kekich.productshop.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SIgnInRequest {

    @NotNull
    private String username;
    @NotNull
    private String password;
}
