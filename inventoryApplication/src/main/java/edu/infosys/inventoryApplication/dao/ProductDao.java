package edu.infosys.inventoryApplication.dao;

import java.util.List;

import edu.infosys.inventoryApplication.bean.Product;

public interface ProductDao {
	    public void saveProduct(Product product);
	    public List<Product> showAllProducts();
	    public Product getProductById(String id);
	    public void removeProduct(String id);
	    public String getMaxProductId(); 
	    public Double getReorderLevelByProductId(String id);
		public List<Product> getProductByVendor(String vendorId);

}
