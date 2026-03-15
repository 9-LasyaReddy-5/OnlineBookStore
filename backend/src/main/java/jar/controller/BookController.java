package jar.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import jar.entity.Book;
import jar.service.BookService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/books")
public class BookController {

    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    // Root endpoint
    @GetMapping("/")
    public String root() {
        return "Backend is running! 🎉\n\nFrontend: http://localhost:5187\nAPI: http://localhost:8080/api/books";
    }

    // GET all books
    @GetMapping
    public List<Book> getAllBooks() {
        return service.getAllBooks();
    }

    // GET book by id
    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return service.getBookById(id);
    }

    // CREATE book
    @PostMapping
    public Book saveBook(@RequestBody Book book) {
        return service.saveBook(book);
    }

    // UPDATE book
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book book) {
        book.setId(id);
        return service.saveBook(book);
    }

    // DELETE book
    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable Long id) {
        service.deleteBook(id);
        return "Book deleted successfully!";
    }
}