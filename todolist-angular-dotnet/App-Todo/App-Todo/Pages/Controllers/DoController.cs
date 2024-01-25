using App_Todo.App_Todo.Pages.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace App_Todo.Pages.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoController : ControllerBase
    {
        private readonly Context context;

        public DoController(Context context)
        {
            this.context = context;
        }

        [HttpGet("{personId}")]
        public async Task<ActionResult<IEnumerable<Do>>> GetAllDos(int personId)
        {
            try
            {
                return await context.Dos.Where(d => d.PersonId == personId).ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal error: {ex.Message}");
            }
        }

        [HttpGet("getDo/{doId}")]
        public async Task<ActionResult<Do>> GetDo(int doId)
        {
            try
            {
                Do? doItem = await context.Dos
                    .Where(d => d.DoId == doId)
                    .FirstOrDefaultAsync();

                if (doItem == null)
                {
                    return NotFound($"Do with ID {doId} not found");
                }

                return doItem;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal error: {ex.Message}");
            }
        }

        [HttpGet("{personId}/{doId}")]
        public async Task<ActionResult<Do>> GetDoById(int personId, int doId)
        {
            try
            {
                Do? doItem = await context.Dos
                    .Where(d => d.PersonId == personId && d.DoId == doId)
                    .FirstOrDefaultAsync();

                if (doItem == null)
                {
                    return NotFound($"Do with ID {doId} not found for Person ID {personId}");
                }

                return doItem;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal error: {ex.Message}");
            }
        }

        private void UpdatePersonDos(int personId)
        {
            var person = context.People
                .Include(p => p.Dos)
                .SingleOrDefault(p => p.PersonId == personId);

            if (person != null)
            {
                context.Entry(person).Collection(p => p.Dos).Load();

                if (person.Dos == null)
                {
                    person.Dos = new List<Do>();
                }
            }
        }

        [HttpPost("{personId}")]
        public async Task<ActionResult> SaveDoAsync([FromBody] Do doItem, int personId)
        {
            try
            {
                doItem.PersonId = personId;
                await context.Dos.AddAsync(doItem);
                await context.SaveChangesAsync();

                UpdatePersonDos(personId);

                return Ok("Do item created successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal error: {ex.Message}");
            }
        }

        [HttpPut("{personId}/{doId}")]
        public async Task<ActionResult> EditDoAsync(int personId, int doId, [FromBody] Do doItem)
        {
            try
            {
                Console.WriteLine($"Received request to edit Do. Person ID: {personId}, Do ID: {doId}");
                
                if (doItem == null)
                {
                    return BadRequest("Invalid payload");
                }

                if (doId != doItem.DoId || personId != doItem.PersonId)
                {
                    return BadRequest("Do ID or Person ID mismatch");
                }

                var existingDo = await context.Dos
                    .Where(d => d.PersonId == personId && d.DoId == doId)
                    .SingleOrDefaultAsync();

                if (existingDo == null)
                {
                    return NotFound($"Do with ID {doId} not found for Person ID {personId}");
                }

                existingDo.Title = doItem.Title;
                existingDo.Description = doItem.Description;
                existingDo.Date = doItem.Date;
                await context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal error: {ex.Message}");
            }
        }

        [HttpDelete("{personId}/{doId}")]
        public async Task<ActionResult> DeleteDoAsync(int personId, int doId)
        {
            try
            {
                Do? doItem = await context.Dos
                    .Where(d => d.PersonId == personId && d.DoId == doId)
                    .FirstOrDefaultAsync();

                if (doItem == null)
                {
                    return NotFound($"Do with ID {doId} not found for Person ID {personId}");
                }

                context.Dos.Remove(doItem);
                await context.SaveChangesAsync();

                UpdatePersonDos(personId);

                return Ok($"Do with ID {doId} for Person ID {personId} has been deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }
    }
}
