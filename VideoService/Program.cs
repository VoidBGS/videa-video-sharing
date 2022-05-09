using Microsoft.EntityFrameworkCore;
using VideoService.AsyncComm;
using VideoService.Data;
using VideoService.SyncComm.Http;

var builder = WebApplication.CreateBuilder(args);
IWebHostEnvironment environment = builder.Environment;

builder.Services.AddControllers();

builder.Services.AddScoped<IVideoRepo, VideoRepo>();
if (environment.IsProduction())
{
    Console.WriteLine("Using Postgre SQL Database..");
    builder.Services.AddDbContext<AppDbContext>(
    opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("VideaContext")));
}
else
{
    Console.WriteLine("Using In-Memory Database..");
    builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("InMemory"));
}
builder.Services.AddHttpClient<ILikeDataClient, HttpLikeDataClient>();
builder.Services.AddSingleton<IMessageBusClient, MessageBusClient>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

SeedDatabase.PrepData(app, environment.IsProduction());

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
