using Microsoft.EntityFrameworkCore;
using RestService.Models;

namespace RestService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<SensorData> SensorData => Set<SensorData>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SensorData>()
                .ToTable("sensor_data");

            modelBuilder.Entity<SensorData>()
                .Property(x => x.Id)
                .HasColumnName("id");

            modelBuilder.Entity<SensorData>()
                .Property(x => x.DeviceId)
                .HasColumnName("device_id");

            modelBuilder.Entity<SensorData>()
                .Property(x => x.Timestamp)
                .HasColumnName("timestamp");

            modelBuilder.Entity<SensorData>()
                .Property(x => x.Co)
                .HasColumnName("co");

            modelBuilder.Entity<SensorData>()
                .Property(x => x.Humidity)
                .HasColumnName("humidity");

            modelBuilder.Entity<SensorData>()
                .Property(x => x.Light)
                .HasColumnName("light");

            modelBuilder.Entity<SensorData>()
                .Property(x => x.Smoke)
                .HasColumnName("smoke");

            modelBuilder.Entity<SensorData>()
                .Property(x => x.Temp)
                .HasColumnName("temperature");
        }
    }
}