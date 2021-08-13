using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace STC.WebApp.Models.Request
{
    public class AddCandidateRequest
    {
        public string Cnic { get; set; }
        public int DistrictId { get; set; }
        public int LocationClassId { get; set; }
        public int MaxQualificationId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string FatherName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public bool WOS { get; set; }
        public bool WOA { get; set; }
        public bool DLH { get; set; }
        public float Height { get; set; }
        public float Chest { get; set; }
        public float Weight { get; set; }
        public bool VisibleDeformity { get; set; }
        public bool Ncse { get; set; }

    }
}
