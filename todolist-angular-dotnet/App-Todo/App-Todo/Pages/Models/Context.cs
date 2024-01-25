using Microsoft.EntityFrameworkCore;

namespace App_Todo.App_Todo.Pages.Models
{
    public class Context : DbContext
    {
        public DbSet<Person> People { get; set; }
        public DbSet<Do> Dos { get; set; }

        public Context(DbContextOptions<Context> options) : base(options)
        {

        }
    }
}
