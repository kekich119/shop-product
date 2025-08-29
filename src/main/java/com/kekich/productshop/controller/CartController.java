package com.kekich.productshop.controller;

import com.kekich.productshop.JWT.JwtCore;
import com.kekich.productshop.model.Cart;
import com.kekich.productshop.model.Product;
import com.kekich.productshop.service.CartService;
import com.kekich.productshop.service.ProductService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CartController {

    private final CartService cartService;
    private final ProductService productService;
    private JwtCore jwtCore;


    public CartController(CartService cartService, ProductService productService, JwtCore jwtCore) {
        this.productService = productService;
        this.cartService = cartService;
        this.jwtCore = jwtCore;
    }

    @PostMapping("/add/cart")
    public Cart addCart(@RequestBody Cart cart, HttpServletRequest request) {

        if (request.getCookies() != null) {
            for (var cookie : request.getCookies()) {
                if (cookie.getName().equals("jwt")) {
                    String jwt = cookie.getValue();
                    String id = jwtCore.getIdFromToken(jwt);
                    cart.setUserId(Long.parseLong(id));
                }
            }
        }
        return cartService.addCart(cart);
    }

    @GetMapping("/view/cart")
    public List<Cart> viewCart(HttpServletRequest request) {

        String jwt = null;
        String id = null;
        if (request.getCookies() != null) {
            for (var cookie : request.getCookies()) {
                if (cookie.getName().equals("jwt")) {
                    jwt = cookie.getValue();
                    id = jwtCore.getIdFromToken(jwt);
                }
            }
        }
        return cartService.getCartsByUserId(Long.parseLong(id));

    }


    @Transactional
    @DeleteMapping("/remove/cart/{productId}")
    public ResponseEntity<?> removeCart(@PathVariable("productId") Long productId) {
        if (cartService.isCartExist(productId)) {
            cartService.deleteCart(productId);
            return ResponseEntity.ok().build();

        }else {
            System.out.println("Ошибка");
            return ResponseEntity.notFound().build();

        }
    }


}
