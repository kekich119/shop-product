package com.kekich.productshop.controller;

import com.kekich.productshop.service.CartService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }



}
