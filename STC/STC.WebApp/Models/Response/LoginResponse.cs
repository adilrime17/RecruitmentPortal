using STC.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace STC.WebApp.Models.Response
{
    public class LoginResponse
    {
        public string FullName { get; set; }
        public string Role { get; set; }
        public string JwtToken { get; set; }
        public string ExpiryTime { get; set; }

        public LoginResponse(string jwtToken, string expiryTime, User user)
        {
            JwtToken = jwtToken;
            ExpiryTime = expiryTime;
            FullName = user.FullName;
            Role = user.Role.Name;
        }
    }
}
