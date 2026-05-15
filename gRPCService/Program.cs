using gRPCService.Data;
using gRPCService.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddGrpc();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql("Host=localhost;Port=5432;Database=iot_db;Username=postgres;Password=postgres"));

var app = builder.Build();

app.MapGrpcService<SensorService>();

app.Run();