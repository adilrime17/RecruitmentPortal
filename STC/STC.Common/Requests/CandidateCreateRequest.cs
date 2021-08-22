using System;
using System.Collections.Generic;
using System.Text;

namespace STC.Common.Requests
{
    public class CandidateCreateRequest : CandidateUpdateRequest
    {
        public string Cnic { get; set; }
    }

}
