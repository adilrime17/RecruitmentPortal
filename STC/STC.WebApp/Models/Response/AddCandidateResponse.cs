using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace STC.WebApp.Models.Response
{
    public class AddCandidateResponse
    {
        public string RegistrationNumber { get; set; }
        public bool IsEligible { get; set; }
    }
}
