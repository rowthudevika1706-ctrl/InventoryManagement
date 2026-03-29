package edu.infosys.inventoryApplication.dao;

import java.util.List;

import edu.infosys.inventoryApplication.bean.ProductSale;
import edu.infosys.inventoryApplication.bean.Transaction;

public interface TransactionDao {
    public void saveTransaction(Transaction transaction);
    //public List<Transaction> getAllTransactions();
    public Transaction getTransactionById(String transactionId);
    public void deleteTransactionById(String transactionId);
    public String findMaxTransactionIdByType(String type);
    public List<Transaction> findTransactionByType(String type);
    public List<Double> getDemandByProduct(String productId);
    public List<ProductSale> getProductWiseTotalSale();
   
}
