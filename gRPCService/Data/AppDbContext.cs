using Microsoft.EntityFrameworkCore;
using gRPCService.Models;

namespace gRPCService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Models.SensorData> SensorData => Set<Models.SensorData>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Models.SensorData>()
                .ToTable("sensor_data");

            modelBuilder.Entity<Models.SensorData>()
                .Property(x => x.Id)
                .HasColumnName("id");

            modelBuilder.Entity<Models.SensorData>()
                .Property(x => x.DeviceId)
                .HasColumnName("device_id");

            modelBuilder.Entity<Models.SensorData>()
                .Property(x => x.Timestamp)
                .HasColumnName("timestamp");

            modelBuilder.Entity<Models.SensorData>()
                .Property(x => x.Co)
                .HasColumnName("co");

            modelBuilder.Entity<Models.SensorData>()
                .Property(x => x.Humidity)
                .HasColumnName("humidity");

            modelBuilder.Entity<Models.SensorData>()
                .Property(x => x.Light)
                .HasColumnName("light");

            modelBuilder.Entity<Models.SensorData>()
                .Property(x => x.Smoke)
                .HasColumnName("smoke");

            modelBuilder.Entity<Models.SensorData>()
                .Property(x => x.Temp)
                .HasColumnName("temperature");
        }
    }
}