using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestService.Data;
using RestService.Models;

namespace RestService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SensorController : ControllerBase
    {
        private readonly AppDbContext _db;

        public SensorController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet("select/{deviceId}")]
        public IActionResult GetLatest(string deviceId)
        {
            var data = _db.SensorData
                .AsNoTracking()
                .Where(x => x.DeviceId == deviceId)
                .OrderByDescending(x => x.Timestamp)
                .FirstOrDefault();

            if (data == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                temp = data.Temp,
                co = data.Co
            });
        }

        [HttpGet("device/{deviceId}")]
        public IActionResult GetByDevice(string deviceId, int page = 1, int pageSize = 100)
        {
            var data = _db.SensorData
                .AsNoTracking()
                .Where(x => x.DeviceId == deviceId)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(data);
        }


        // 12. jul 2020 ------------- 20. jul 2020
        //
        // Primer daatuma: 2020-07-12T15:41:34
        [HttpGet("range")]
        public IActionResult GetByDateRange(DateTime from, DateTime to, int page = 1, int pageSize = 100)
        {
            double fromUnix = ((DateTimeOffset)from).ToUnixTimeSeconds();
            double toUnix = ((DateTimeOffset)to).ToUnixTimeSeconds();

            var data = _db.SensorData
                .AsNoTracking()
                .Where(x => x.Timestamp >= fromUnix &&
                            x.Timestamp <= toUnix)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(data);
        }

        [HttpPost]
        public IActionResult AddSensorData([FromBody] SensorData sensor)
        {
            _db.SensorData.Add(sensor);
            _db.SaveChanges();

            return Created("", sensor);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteSensorData(int id)
        {
            var entity = _db.SensorData.FirstOrDefault(x => x.Id == id);

            if (entity == null)
                return NotFound();

            _db.SensorData.Remove(entity);
            _db.SaveChanges();

            return Ok();
        }

        [HttpGet("temp-above/{value}")]
        public IActionResult GetTemperatureAbove(double value, int page = 1, int pageSize = 100)
        {
            var data = _db.SensorData
                .AsNoTracking()
                .Where(x => x.Temp > value)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(data);
        }

        [HttpGet("temp-below/{value}")]
        public IActionResult GetTemperatureBelow(double value, int page = 1, int pageSize = 100)
        {
            var data = _db.SensorData
                .AsNoTracking()
                .Where(x => x.Temp < value)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(data);
        }

        [HttpGet("humidity-above/{value}")]
        public IActionResult GetHumidityAbove(double value, int page = 1, int pageSize = 100)
        {
            var data = _db.SensorData
                .AsNoTracking()
                .Where(x => x.Humidity > value)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(data);
        }

        [HttpGet("humidity-below/{value}")]
        public IActionResult GetHumidityBelow(double value, int page = 1, int pageSize = 100)
        {
            var data = _db.SensorData
                .AsNoTracking()
                .Where(x => x.Humidity < value)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(data);
        }

        [HttpGet("co-above/{value}")]
        public IActionResult GetCoAbove(double value, int page = 1, int pageSize = 100)
        {
            var data = _db.SensorData
                .AsNoTracking()
                .Where(x => x.Co > value)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(data);
        }

        [HttpGet("smoke-above/{value}")]
        public IActionResult GetSmokeAbove(double value, int page = 1, int pageSize = 100)
        {
            var data = _db.SensorData
                .AsNoTracking()
                .Where(x => x.Smoke > value)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(data);
        }

        [HttpGet("light/{status}")]
        public IActionResult GetByLightStatus(bool status, int page = 1, int pageSize = 100)
        {
            var data = _db.SensorData
                .AsNoTracking()
                .Where(x => x.Light == status)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(data);
        }

        [HttpGet("stats")]
        public IActionResult GetTemperatureStats()
        {
            var result = new
            {
                MinTemperature = _db.SensorData.Min(x => x.Temp),
                MaxTemperature = _db.SensorData.Max(x => x.Temp),
                AverageTemperature = _db.SensorData.Average(x => x.Temp),

                MinCo = _db.SensorData.Min(x => x.Co),
                MaxCo = _db.SensorData.Max(x => x.Co),
                AverageCo = _db.SensorData.Average(x => x.Co),

                MinHumidity = _db.SensorData.Min(x => x.Humidity),
                MaxHumidity = _db.SensorData.Max(x => x.Humidity),
                AverageHumidity = _db.SensorData.Average(x => x.Humidity),

                MinSmoke = _db.SensorData.Min(x => x.Smoke),
                MaxSmoke = _db.SensorData.Max(x => x.Smoke),
                AverageSmoke = _db.SensorData.Average(x => x.Smoke),

                TotalCount = _db.SensorData.Count()
            };

            return Ok(result);
        }

        [HttpGet("device/{deviceId}/count")]
        public IActionResult GetDeviceCount(string deviceId)
        {
            var count = _db.SensorData
                .Count(x => x.DeviceId == deviceId);

            return Ok(count);
        }

        [HttpGet("device/{deviceId}/light-only")]
        public IActionResult GetLightOnly(string deviceId, int page = 1, int pageSize = 100)
        {
            var data = _db.SensorData
                .AsNoTracking()
                .Where(x => x.DeviceId == deviceId)
                .Select(x => new { x.Timestamp, x.Light })
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(data);
        }

        [HttpGet("device/{deviceId}/temp-only")]
        public IActionResult GetTempOnly(string deviceId, int page = 1, int pageSize = 100)
        {
            var data = _db.SensorData
                .AsNoTracking()
                .Where(x => x.DeviceId == deviceId)
                .Select(x => new { x.Timestamp, x.Temp })
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(data);
        }

        [HttpGet("device/{deviceId}/co-only")]
        public IActionResult GetCoOnly(string deviceId, int page = 1, int pageSize = 100)
        {
            var data = _db.SensorData
                .AsNoTracking()
                .Where(x => x.DeviceId == deviceId)
                .Select(x => new { x.Timestamp, x.Co })
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(data);
        }

        [HttpGet("device/{deviceId}/smoke-only")]
        public IActionResult GetSmokeOnly(string deviceId, int page = 1, int pageSize = 100)
        {
            var data = _db.SensorData
                .AsNoTracking()
                .Where(x => x.DeviceId == deviceId)
                .Select(x => new { x.Timestamp, x.Smoke })
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(data);
        }

        [HttpGet("device/{deviceId}/humidity-only")]
        public IActionResult GetHumidityOnly(string deviceId, int page = 1, int pageSize = 100)
        {
            var data = _db.SensorData
                .AsNoTracking()
                .Where(x => x.DeviceId == deviceId)
                .Select(x => new { x.Timestamp, x.Humidity })
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(data);
        }

        [HttpGet("device/{deviceId}/monitoring")]
        public IActionResult GetBasicMonitoring(string deviceId, int page = 1, int pageSize = 100)
        {
            var data = _db.SensorData
                .AsNoTracking()
                .Where(x => x.DeviceId == deviceId)
                .Select(x => new
                {
                    x.Timestamp,
                    x.Temp,
                    x.Humidity,
                    x.Co,
                    x.Smoke,
                    x.Light
                })
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(data);
        }
    }
}