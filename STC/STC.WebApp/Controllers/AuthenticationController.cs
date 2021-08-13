using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using STC.Data;
using STC.Data.Models;
using STC.WebApp.Models.Request;
using STC.WebApp.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace STC.WebApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly STCDbContext _dbContext;

        public AuthenticationController(STCDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            User user = _dbContext.Users.Where(x => x.Username == request.Username && x.Password == request.Password).Include(x => x.Role).FirstOrDefault();
            if (user != null)
            {
                return Ok(new LoginResponse("", DateTime.Now.AddSeconds(3600).ToString(), user));
            }
            return Unauthorized();
        }
    }
}
