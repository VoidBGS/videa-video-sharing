using Microsoft.EntityFrameworkCore;
using VideoService.AsyncComm;
using VideoService.Data;
using VideoService.SyncComm.Http;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(
    opt => opt.UseInMemoryDatabase("MemoryDB"));
builder.Services.AddScoped<IVideoRepo, VideoRepo>();
builder.Services.AddHttpClient<ILikeDataClient, HttpLikeDataClient>();
builder.Services.AddSingleton<IMessageBusClient, MessageBusClient>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

SeedDatabase.PrepData(app);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
