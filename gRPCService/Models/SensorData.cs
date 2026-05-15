namespace gRPCService.Models
{
    public class SensorData
    {
        public int Id { get; set; }
        public string DeviceId { get; set; } = string.Empty;
        public double Temp { get; set; }
        public double Humidity { get; set; }
        public double Co { get; set; }
        public double Smoke { get; set; }
        public bool Light { get; set; }
        public double Timestamp { get; set; }
    }
}