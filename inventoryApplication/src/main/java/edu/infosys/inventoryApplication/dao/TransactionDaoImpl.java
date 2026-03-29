package edu.infosys.inventoryApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import edu.infosys.inventoryApplication.bean.ProductSale;
import edu.infosys.inventoryApplication.bean.Transaction;

@Service
@Repository
public class TransactionDaoImpl implements TransactionDao {

	@Autowired
	private TransactionRepository repository;

	@Override
	public void saveTransaction(Transaction transaction) {
		// TODO Auto-generated method stub
		repository.save(transaction);
			
	}

	/*@Override
	public List<Transaction> getAllTransactions() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}*/

	@Override
	public Transaction getTransactionById(String transactionId) {
		// TODO Auto-generated method stub
		return repository.findById(transactionId).get();
	}

	@Override
	public void deleteTransactionById(String transactionId) {
		// TODO Auto-generated method stub
		repository.deleteById(transactionId);

	}
	
    public String findMaxTransactionIdByType(String type) {
    	return repository.findMaxTransactionIdByType(type);
    }
    
    
    public List<Transaction> findTransactionByType(String type){
    	return repository.findTransactionsByType(type);
    }
    
    @Override
    public List<Double> getDemandByProduct(String productId)
    {
    	return repository.getDemandByProduct(productId);
    }
    
    @Override
    public List<ProductSale> getProductWiseTotalSale(){
    	return repository.getProductWiseTotalSale();
    }
    

	
}
