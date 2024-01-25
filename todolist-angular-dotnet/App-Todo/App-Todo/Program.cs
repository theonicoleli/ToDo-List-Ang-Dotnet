using App_Todo.App_Todo.Pages.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<Context>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("ConexaoBD")));
builder.Services.AddRazorPages();

// Add CORS services
builder.Services.AddCors();

var app = builder.Build();

// Enable CORS
app.UseCors(options =>
{
    options.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
});

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");

    // Enable HSTS (HTTP Strict Transport Security)
    app.UseHsts();

    // Require HTTPS
    app.UseHttpsRedirection();
}

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

// Map controllers
app.MapControllers();

app.Run();
