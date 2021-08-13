using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using STC.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace STC.WebApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly STCDbContext _dbContext;

        public DataController(STCDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("districts")]
        public IActionResult GetAllDistricts()
        {
            return Ok(
                _dbContext.Districts.Select(x => x.Province).Distinct().ToList()
                .Select(x => new
                {
                    Province = x,
                    Districts = _dbContext.Districts.Where(y => y.Province == x).Select(y => new { Id = y.Id, Name = y.Name }).ToList()
                })
                .ToList());
        }

        [HttpGet("location_classes")]
        public IActionResult GetAllLocationClasses()
        {
            return Ok(_dbContext.LocationClasses.Select(x => new { Id = x.Id, Name = x.Name }));
        }

        [HttpGet("qualifications")]
        public IActionResult GetAllQualifications()
        {
            return Ok(_dbContext.Qualifications.Select(x => new { Id = x.Id, Name = x.Name }));
        }
    }
}
