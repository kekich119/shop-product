package com.kekich.productshop.controller;

import com.kekich.productshop.model.Product;
import com.kekich.productshop.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
    public ResponseEntity<Product> addProduct(
            @RequestParam("name") String name,
            @RequestParam("price") int price,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam("image") MultipartFile image) throws IOException {

        // Папка для сохранения изображений
        String uploadDir = "/Users/kekich/product-images/";
        File uploadFolder = new File(uploadDir);

        // Генерация уникального имени файла
        String filename = System.currentTimeMillis() + "_" + image.getOriginalFilename();

        // Сохраняем файл
        File file = new File(uploadDir + filename);
        image.transferTo(file);

        // Сохраняем товар в БД
        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setDescription(description);
        product.setImageUrl("/images/" + filename); // путь для фронта

        productService.addProduct(product);

        return ResponseEntity.ok(product);
    }

    @GetMapping("/get/product/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        productService.findProductById(id);
        return ResponseEntity.ok().body(productService.findProductById(id));


    }

}
