using STC.Common.Requests;
using System;
using System.Collections.Generic;
using System.Text;

namespace STC.Common.Responses
{
    public class EducationalDataResponse : EducationalDataRequest
    {
        public string RegistrationNo { get; set; }
        public bool Ncse { get; set; }
        public string MaxQualification { get; set; }
    }


}
