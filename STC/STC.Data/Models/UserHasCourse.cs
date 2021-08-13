using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace STC.Data.Models
{
    [Table("user_has_course")]
    [Index(nameof(CourseId), Name = "fk_user_has_course_course1_idx")]
    [Index(nameof(UserId), Name = "fk_user_has_course_user1_idx")]
    public partial class UserHasCourse
    {
        [Key]
        [Column("user_id")]
        public int UserId { get; set; }
        [Key]
        [Column("course_id")]
        public int CourseId { get; set; }

        [ForeignKey(nameof(CourseId))]
        [InverseProperty("UserHasCourses")]
        public virtual Course Course { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty("UserHasCourses")]
        public virtual User User { get; set; }
    }
}
