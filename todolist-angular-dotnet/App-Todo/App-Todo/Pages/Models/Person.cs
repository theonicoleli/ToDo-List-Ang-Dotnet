namespace App_Todo.App_Todo.Pages.Models
{
    public class Person
    {
        public int PersonId { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }

        private List<Do> _dos = new List<Do>();

        public List<Do> Dos 
        { 
            get => _dos ??= new List<Do>();
            set => _dos = value;
        }
    }
}
