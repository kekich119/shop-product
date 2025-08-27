package com.kekich.productshop.controller;

import com.kekich.productshop.model.Product;
import com.kekich.productshop.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
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

}
