using Grpc.Core;
using gRPCService.Data;
using Microsoft.EntityFrameworkCore;

namespace gRPCService.Services
{
    public class SensorService : Sensor.SensorBase
    {
        private readonly AppDbContext _db;

        public SensorService(AppDbContext db)
        {
            _db = db;
        }

        public override async Task<SelectResponse> GetLatest(DeviceRequest request, ServerCallContext context)
        {
            var data = await _db.SensorData
                .AsNoTracking()
                .Where(x => x.DeviceId == request.DeviceId)
                .OrderByDescending(x => x.Timestamp)
                .FirstOrDefaultAsync();

            return new SelectResponse
            {
                Temp = data?.Temp ?? 0,
                Co = data?.Co ?? 0
            };
        }

        public override async Task<SensorResponse> GetByDevice(DevicePaginationRequest request, ServerCallContext context)
        {
            var data = await _db.SensorData
                .AsNoTracking()
                .Where(x => x.DeviceId == request.DeviceId)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            return Map(data);
        }

        public override async Task<SensorResponse> GetRange(RangeRequest request, ServerCallContext context)
        {
            var data = await _db.SensorData
                .AsNoTracking()
                .Where(x => x.Timestamp >= request.From &&
                            x.Timestamp <= request.To)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            return Map(data);
        }

        public override async Task<SensorResponse> GetTemperatureAbove(ValuePaginationRequest request, ServerCallContext context)
        {
            var data = await _db.SensorData
                .AsNoTracking()
                .Where(x => x.Temp > request.Value)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            return Map(data);
        }

        public override async Task<SensorResponse> GetTemperatureBelow(ValuePaginationRequest request, ServerCallContext context)
        {
            var data = await _db.SensorData
                .AsNoTracking()
                .Where(x => x.Temp < request.Value)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            return Map(data);
        }

        public override async Task<SensorResponse> GetHumidityAbove(ValuePaginationRequest request, ServerCallContext context)
        {
            var data = await _db.SensorData
                .AsNoTracking()
                .Where(x => x.Humidity > request.Value)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            return Map(data);
        }

        public override async Task<SensorResponse> GetHumidityBelow(ValuePaginationRequest request, ServerCallContext context)
        {
            var data = await _db.SensorData
                .AsNoTracking()
                .Where(x => x.Humidity < request.Value)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            return Map(data);
        }

        public override async Task<SensorResponse> GetCoAbove(ValuePaginationRequest request, ServerCallContext context)
        {
            var data = await _db.SensorData
                .AsNoTracking()
                .Where(x => x.Co > request.Value)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            return Map(data);
        }

        public override async Task<SensorResponse> GetSmokeAbove(ValuePaginationRequest request, ServerCallContext context)
        {
            var data = await _db.SensorData
                .AsNoTracking()
                .Where(x => x.Smoke > request.Value)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            return Map(data);
        }

        public override async Task<SensorResponse> GetByLightStatus(LightRequest request, ServerCallContext context)
        {
            var data = await _db.SensorData
                .AsNoTracking()
                .Where(x => x.Light == request.Status)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            return Map(data);
        }

        public override async Task<SensorResponse> GetLightOnly(DevicePaginationRequest request, ServerCallContext context)
        {
            var data = await _db.SensorData
                .AsNoTracking()
                .Where(x => x.DeviceId == request.DeviceId)
                .Select(x => new Models.SensorData
                {
                    Id = x.Id,
                    DeviceId = x.DeviceId,
                    Timestamp = x.Timestamp,
                    Light = x.Light
                })
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            return Map(data);
        }

        public override async Task<SensorResponse> GetTempOnly(DevicePaginationRequest request, ServerCallContext context)
        {
            var data = await _db.SensorData
                .AsNoTracking()
                .Where(x => x.DeviceId == request.DeviceId)
                .Select(x => new Models.SensorData
                {
                    Id = x.Id,
                    DeviceId = x.DeviceId,
                    Timestamp = x.Timestamp,
                    Temp = x.Temp
                })
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            return Map(data);
        }

        public override async Task<SensorResponse> GetCoOnly(DevicePaginationRequest request, ServerCallContext context)
        {
            var data = await _db.SensorData
                .AsNoTracking()
                .Where(x => x.DeviceId == request.DeviceId)
                .Select(x => new Models.SensorData
                {
                    Id = x.Id,
                    DeviceId = x.DeviceId,
                    Timestamp = x.Timestamp,
                    Co = x.Co
                })
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            return Map(data);
        }

        public override async Task<SensorResponse> GetSmokeOnly(DevicePaginationRequest request, ServerCallContext context)
        {
            var data = await _db.SensorData
                .AsNoTracking()
                .Where(x => x.DeviceId == request.DeviceId)
                .Select(x => new Models.SensorData
                {
                    Id = x.Id,
                    DeviceId = x.DeviceId,
                    Timestamp = x.Timestamp,
                    Smoke = x.Smoke
                })
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            return Map(data);
        }

        public override async Task<SensorResponse> GetHumidityOnly(DevicePaginationRequest request, ServerCallContext context)
        {
            var data = await _db.SensorData
                .AsNoTracking()
                .Where(x => x.DeviceId == request.DeviceId)
                .Select(x => new Models.SensorData
                {
                    Id = x.Id,
                    DeviceId = x.DeviceId,
                    Timestamp = x.Timestamp,
                    Humidity = x.Humidity
                })
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            return Map(data);
        }

        public override async Task<SensorResponse> GetMonitoring(DevicePaginationRequest request, ServerCallContext context)
        {
            var data = await _db.SensorData
                .AsNoTracking()
                .Where(x => x.DeviceId == request.DeviceId)
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToListAsync();

            return Map(data);
        }

        public override async Task<CountResponse> GetDeviceCount(DeviceRequest request, ServerCallContext context)
        {
            var count = await _db.SensorData
                .CountAsync(x => x.DeviceId == request.DeviceId);

            return new CountResponse
            {
                Count = count
            };
        }

        public override async Task<StatsResponse> GetStats(Empty request, ServerCallContext context)
        {
            return new StatsResponse
            {
                MinTemperature = await _db.SensorData.MinAsync(x => x.Temp),
                MaxTemperature = await _db.SensorData.MaxAsync(x => x.Temp),
                AverageTemperature = await _db.SensorData.AverageAsync(x => x.Temp),

                MinCo = await _db.SensorData.MinAsync(x => x.Co),
                MaxCo = await _db.SensorData.MaxAsync(x => x.Co),
                AverageCo = await _db.SensorData.AverageAsync(x => x.Co),

                MinHumidity = await _db.SensorData.MinAsync(x => x.Humidity),
                MaxHumidity = await _db.SensorData.MaxAsync(x => x.Humidity),
                AverageHumidity = await _db.SensorData.AverageAsync(x => x.Humidity),

                MinSmoke = await _db.SensorData.MinAsync(x => x.Smoke),
                MaxSmoke = await _db.SensorData.MaxAsync(x => x.Smoke),
                AverageSmoke = await _db.SensorData.AverageAsync(x => x.Smoke),

                TotalCount = await _db.SensorData.CountAsync()
            };
        }

        private SensorResponse Map(List<Models.SensorData> data)
        {
            var response = new SensorResponse();

            response.Data.AddRange(data.Select(x => new SensorData
            {
                Id = x.Id,
                DeviceId = x.DeviceId,
                Temp = x.Temp,
                Humidity = x.Humidity,
                Co = x.Co,
                Smoke = x.Smoke,
                Light = x.Light,
                Timestamp = x.Timestamp
            }));

            return response;
        }

        public override async Task<SensorData> AddSensorData(CreateSensorRequest request, ServerCallContext context)
        {
            var entity = new Models.SensorData
            {
                DeviceId = request.DeviceId,
                Temp = request.Temp,
                Humidity = request.Humidity,
                Co = request.Co,
                Smoke = request.Smoke,
                Light = request.Light,
                Timestamp = request.Timestamp
            };

            _db.SensorData.Add(entity);

            await _db.SaveChangesAsync();

            return new SensorData
            {
                Id = entity.Id,
                DeviceId = entity.DeviceId,
                Temp = entity.Temp,
                Humidity = entity.Humidity,
                Co = entity.Co,
                Smoke = entity.Smoke,
                Light = entity.Light,
                Timestamp = entity.Timestamp
            };
        }

        public override async Task<DeleteResponse> DeleteSensorData(DeleteRequest request, ServerCallContext context)
        {
            var entity = await _db.SensorData
                .FirstOrDefaultAsync(x => x.Id == request.Id);

            if (entity == null)
            {
                return new DeleteResponse
                {
                    Success = false,
                    Message = "Sensor data not found"
                };
            }
            _db.SensorData.Remove(entity);

            await _db.SaveChangesAsync();

            return new DeleteResponse
            {
                Success = true,
                Message = "Deleted successfully"
            };
        }
    }
}