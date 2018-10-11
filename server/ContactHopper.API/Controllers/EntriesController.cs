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
    public class EntriesController : ControllerBase
    {
        private readonly IDataContext _context;
        private readonly ILogger<EntriesController> _log;

        public EntriesController(IDataContext context, ILogger<EntriesController> log)
        {
            _context = context;
            _log = log;
        }

        // GET: api/Entries
        [HttpGet]
        public IActionResult GetEntries()
        {
            try
            {
                return Ok(_context.Entries);
            }
            catch (Exception ex)
            {
                _log.LogError(ex,"GET");
                throw ex;
            }
        }

        // GET: api/Entries/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEntry([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var entry = await _context.Entries.FindAsync(id);

                if (entry == null)
                {
                    return NotFound();
                }

                return Ok(entry);
            }
            catch (Exception ex)
            {
                _log.LogError(ex, "PUT");
                throw ex;
            }
        }

        // PUT: api/Entries/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntry([FromRoute] int id, [FromBody] Entry entry)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (id != entry.Id)
                {
                    return BadRequest();
                }

                _context.Entry(entry).State = EntityState.Modified;

                await _context.SaveChangesAsync();

                return Ok(entry);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                _log.LogError(ex, "PUT");
                if (!EntryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw ex;
                }
            }
            catch (Exception ex)
            {
                _log.LogError(ex, "PUT");
                throw ex;
            }
        }

        // POST: api/Entries
        [HttpPost]
        public async Task<IActionResult> PostEntry([FromBody] Entry entry)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                _context.Entries.Add(entry);
                await _context.SaveChangesAsync();

                return Ok(entry);
            }
            catch (Exception ex)
            {
                _log.LogError(ex,"POST");
                throw ex;
            }
        }

        // DELETE: api/Entries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntry([FromRoute] int id)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var entry = await _context.Entries.FindAsync(id);
                if (entry == null)
                {
                    return NotFound();
                }

                _context.Entries.Remove(entry);
                await _context.SaveChangesAsync();

                return Ok(entry);
            }
            catch (Exception ex)
            {
                _log.LogError(ex, "DELETE");
                throw ex;
            }

        }

        private bool EntryExists(int id)
        {
            return _context.Entries.Any(e => e.Id == id);
        }
    }
}