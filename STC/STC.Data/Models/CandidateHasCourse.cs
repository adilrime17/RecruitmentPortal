using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace STC.Data.Models
{
    [Table("candidate_has_course")]
    [Index(nameof(CandidateCnic), Name = "fk_candidate_has_course_candidate1_idx")]
    [Index(nameof(CourseId), Name = "fk_candidate_has_course_course1_idx")]
    [Index(nameof(StatusId), Name = "fk_candidate_has_course_status1_idx")]
    public partial class CandidateHasCourse
    {
        [Key]
        [Column("candidate_cnic")]
        [StringLength(50)]
        public string CandidateCnic { get; set; }
        [Key]
        [Column("course_id")]
        public int CourseId { get; set; }
        [Key]
        [Column("status_id")]
        [StringLength(250)]
        public string StatusId { get; set; }

        [ForeignKey(nameof(CandidateCnic))]
        [InverseProperty(nameof(Candidate.CandidateHasCourses))]
        public virtual Candidate CandidateCnicNavigation { get; set; }
        [ForeignKey(nameof(CourseId))]
        [InverseProperty("CandidateHasCourses")]
        public virtual Course Course { get; set; }
        [ForeignKey(nameof(StatusId))]
        [InverseProperty("CandidateHasCourses")]
        public virtual Status Status { get; set; }
    }
}
