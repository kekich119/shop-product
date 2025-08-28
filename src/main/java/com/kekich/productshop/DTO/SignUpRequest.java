package com.kekich.productshop.DTO;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data

public class SignUpRequest {


    @NotNull
    private String username;
    @NotNull
    private String email;
    @NotNull
    private String password;
}
