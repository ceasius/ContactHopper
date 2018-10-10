using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ContactHopper.API.Data.Context;
using ContactHopper.API.Data.Entities;


namespace ContactHopper.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhoneBooksController : ControllerBase
    {
        private readonly IDataContext _context;
        private readonly ILogger<PhoneBooksController> _log;

        public PhoneBooksController(IDataContext context, ILogger<PhoneBooksController> log)
        {
            _context = context;
            _log = log;
        }

        // GET: api/PhoneBooks
        [HttpGet]
        public IActionResult GetPhoneBooks()
        {
            try
            {
                var phoneBooks = _context.PhoneBooks.Include(p => p.Entries);
                return Ok(phoneBooks);
            }
            catch (Exception ex)
            {
                _log.LogError("GET", ex);
                throw ex;
            }
        }

        // GET: api/PhoneBooks/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPhoneBook([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                
                var phoneBook = await _context.PhoneBooks
                    .Include(p => p.Entries)
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (phoneBook == null)
                {
                    return NotFound();
                }

                return Ok(phoneBook);
            }
            catch (Exception ex)
            {
                _log.LogError("GET", ex);
                throw ex;
            }
        }

        // PUT: api/PhoneBooks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPhoneBook([FromRoute] int id, [FromBody] PhoneBook phoneBook)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != phoneBook.Id)
                {
                    return BadRequest();
                }

                _context.Entry(phoneBook).State = EntityState.Modified;

                await _context.SaveChangesAsync();


                return Ok(phoneBook);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                _log.LogError("PUT", ex);
                if (!PhoneBookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            catch (Exception ex)
            {
                _log.LogError("PUT", ex);
                throw ex;
            }
        }

        // POST: api/PhoneBooks
        [HttpPost]
        public async Task<IActionResult> PostPhoneBook([FromBody] PhoneBook phoneBook)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.PhoneBooks.Add(phoneBook);
                await _context.SaveChangesAsync();

                return Ok(phoneBook);
            }
            catch (Exception ex)
            {
                _log.LogError("POST", ex);
                throw ex;
            }
        }

        // DELETE: api/PhoneBooks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoneBook([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var phoneBook = await _context.PhoneBooks.FindAsync(id);
                if (phoneBook == null)
                {
                    return NotFound();
                }

                _context.PhoneBooks.Remove(phoneBook);
                await _context.SaveChangesAsync();

                return Ok(phoneBook);
            }
            catch (Exception ex)
            {
                _log.LogError("DELETE", ex);
                throw ex;
            }
        }

        private bool PhoneBookExists(int id)
        {
            return _context.PhoneBooks.Any(e => e.Id == id);
        }
    }
}