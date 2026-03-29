package edu.infosys.inventoryApplication.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import edu.infosys.inventoryApplication.dao.SKURepository;
import edu.infosys.inventoryApplication.dao.ProductRepository;
import edu.infosys.inventoryApplication.dao.InventoryUserRepository;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "http://localhost:3131", allowCredentials = "true")
public class DashboardController {

    @Autowired
    private SKURepository skuRepo;

    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private InventoryUserRepository userRepo;

    @GetMapping("/stats")
    public Map<String, Long> getStats() {

        Map<String, Long> data = new HashMap<>();

        data.put("totalSkus", skuRepo.getTotalSkus());
        data.put("totalProducts", productRepo.getTotalProducts());
        data.put("lowStock", productRepo.getLowStockProducts());
        data.put("vendors", userRepo.getVendorCount());

        return data;
    }
}