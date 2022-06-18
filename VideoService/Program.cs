using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using VideoService.AsyncComm;
using VideoService.Data;
using VideoService.SyncComm.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;

var builder = WebApplication.CreateBuilder(args);
var allowEveryOrigin = "_myAllowSpecificOrigins";
IWebHostEnvironment environment = builder.Environment;

builder.Services.AddScoped<IVideoRepo, VideoRepo>();
if (environment.IsProduction())
{
    builder.Services.AddControllers((options =>
    {
        var policy = new AuthorizationPolicyBuilder()
            .RequireAuthenticatedUser()
            .Build();
        options.Filters.Add(new AuthorizeFilter(policy));
    }));
    Console.WriteLine("Using Azure SQL Server Database..");
    builder.Services.AddDbContext<AppDbContext>(
    opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("VideaContext")));

    builder.Services.AddAuthentication(options =>
     {
         options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
         options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
     }).AddJwtBearer(options =>
     {
         options.Authority = "https://dev-0oy7iyui.us.auth0.com/";
         options.Audience = "https://videa-auth";
     });
}
else
{
    builder.Services.AddControllers();

    Console.WriteLine("Using In-Memory Database..");

    builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("InMemory"));

    builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: allowEveryOrigin,
                          policy =>
                          {
                              policy.WithOrigins("*").AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
                          });
    });
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
    Console.WriteLine("Application is in Development.");
    app.UseCors(allowEveryOrigin);
    app.UseSwagger();
    app.UseSwaggerUI();
}
else if(app.Environment.IsProduction())
{
    app.UseAuthentication();
    app.UseAuthorization();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
