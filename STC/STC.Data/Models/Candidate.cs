using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace STC.Data.Models
{
    [Table("candidate")]
    [Index(nameof(DistrictId), Name = "fk_candidate_district1_idx")]
    [Index(nameof(LocationClassId), Name = "fk_candidate_location_class1_idx")]
    [Index(nameof(MaxQualificationId), Name = "fk_candidate_qualification1_idx")]
    public partial class Candidate
    {
        public Candidate()
        {
            CandidateHasCourses = new HashSet<CandidateHasCourse>();
        }

        [Key]
        [Column("cnic")]
        [StringLength(50)]
        public string Cnic { get; set; }
        [Column("district_id")]
        public int DistrictId { get; set; }
        [Column("location_class_id")]
        public int LocationClassId { get; set; }
        [Column("max_qualification_id")]
        public int MaxQualificationId { get; set; }
        [Required]
        [Column("first_name")]
        [StringLength(250)]
        public string FirstName { get; set; }
        [Column("middle_name")]
        [StringLength(250)]
        public string MiddleName { get; set; }
        [Required]
        [Column("last_name")]
        [StringLength(250)]
        public string LastName { get; set; }
        [Required]
        [Column("father_name")]
        [StringLength(500)]
        public string FatherName { get; set; }
        [Column("date_of_birth", TypeName = "date")]
        public DateTime DateOfBirth { get; set; }
        [Column("w_o_s")]
        public bool WOS { get; set; }
        [Column("w_o_a")]
        public bool WOA { get; set; }
        [Column("d_l_h")]
        public bool DLH { get; set; }
        [Column("height")]
        public float Height { get; set; }
        [Column("chest")]
        public float Chest { get; set; }
        [Column("weight")]
        public float Weight { get; set; }
        [Column("visible_deformity")]
        public bool VisibleDeformity { get; set; }
        [Column("create_time", TypeName = "timestamp")]
        public DateTime CreateTime { get; set; }
        [Column("update_time", TypeName = "timestamp")]
        public DateTime? UpdateTime { get; set; }

        [ForeignKey(nameof(DistrictId))]
        [InverseProperty("Candidates")]
        public virtual District District { get; set; }
        [ForeignKey(nameof(LocationClassId))]
        [InverseProperty("Candidates")]
        public virtual LocationClass LocationClass { get; set; }
        [ForeignKey(nameof(MaxQualificationId))]
        [InverseProperty(nameof(Qualification.Candidates))]
        public virtual Qualification MaxQualification { get; set; }
        [InverseProperty(nameof(CandidateHasCourse.CandidateCnicNavigation))]
        public virtual ICollection<CandidateHasCourse> CandidateHasCourses { get; set; }
    }
}
