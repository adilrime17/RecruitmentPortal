using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace STC.Data.Models
{
    [Table("candidate_course_summary")]
    [Index(nameof(DistrictId), Name = "fk_candidate_course_summary_district1_idx")]
    [Index(nameof(CandidateCnic), Name = "fk_candidate_has_course1_candidate1_idx")]
    [Index(nameof(CourseId), Name = "fk_candidate_has_course1_course1_idx")]
    public partial class CandidateCourseSummary
    {
        [Key]
        [Column("candidate_cnic")]
        [StringLength(50)]
        public string CandidateCnic { get; set; }
        [Key]
        [Column("course_id")]
        public int CourseId { get; set; }
        [Column("district_id")]
        public int DistrictId { get; set; }
        [Column("ward_verified")]
        public bool WardVerified { get; set; }
        [Column("sponsor")]
        [StringLength(500)]
        public string Sponsor { get; set; }

        [ForeignKey(nameof(CandidateCnic))]
        [InverseProperty(nameof(Candidate.CandidateCourseSummaries))]
        public virtual Candidate CandidateCnicNavigation { get; set; }
        [ForeignKey(nameof(CourseId))]
        [InverseProperty("CandidateCourseSummaries")]
        public virtual Course Course { get; set; }
        [ForeignKey(nameof(DistrictId))]
        [InverseProperty("CandidateCourseSummaries")]
        public virtual District District { get; set; }
    }
}
