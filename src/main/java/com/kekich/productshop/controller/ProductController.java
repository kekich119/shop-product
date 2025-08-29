package com.kekich.productshop.controller;

import com.kekich.productshop.model.Product;
import com.kekich.productshop.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/get/products")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/add/product")
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    @GetMapping("/get/product/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        productService.findProductById(id);
        return ResponseEntity.ok().body(productService.findProductById(id));


    }

}
