using Microsoft.EntityFrameworkCore;
using todo_app.Services.Data;
using todo_app.Services.Data.Repositories;
using todo_app.Services;
using todo_app.Services.Models;
using Microsoft.Data.Sqlite;
using Microsoft.Extensions.DependencyInjection;
using System;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var keepAliveConnection = new SqliteConnection("DataSource=:memory:");
keepAliveConnection.Open();

builder.Services.AddDbContext<TodoTaskDbContext>(options =>
{
    options.UseSqlite(keepAliveConnection);
});

//builder.Services.AddDbContext<TodoTaskDbContext>(options =>
//{


//    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"),
//      sqlServerOptions => sqlServerOptions.MigrationsAssembly(typeof(TodoTaskDbContext).Assembly.FullName));
//});

builder.Services.AddScoped<ITodoTaskRepository<TodoTask>, TodoTaskRepository>();
builder.Services.AddScoped<ITodoTaskService, TodoTaskService>();
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAnyOriginPolicy",
//        builder => builder
//            .AllowAnyOrigin() // Allow requests from any origin
//            .AllowAnyHeader()
//            .AllowAnyMethod()
//            .AllowCredentials());
//});
builder.Services.AddCors(options => { options.AddDefaultPolicy(builder => { builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader(); }); });
var app = builder.Build();

//var dbContext = app.Services.GetService<TodoTaskDbContext>();
//dbContext.Database.OpenConnection();
//dbContext.Database.EnsureCreated();

var scope = app.Services.CreateScope();
var db = scope.ServiceProvider.GetService<TodoTaskDbContext>();


db.Database.EnsureDeleted();
db.Database.EnsureCreated();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//app.MapFallbackToFile("/index.html");

app.Run();
