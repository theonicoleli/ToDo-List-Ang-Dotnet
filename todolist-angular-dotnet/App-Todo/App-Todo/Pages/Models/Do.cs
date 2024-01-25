namespace App_Todo.App_Todo.Pages.Models
{
    public class Do
    {
        public int DoId { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public DateTime Date { get; set; }
        public int PersonId { get; set; }
    }
}
